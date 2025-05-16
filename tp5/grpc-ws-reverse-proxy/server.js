const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Chemin vers le fichier proto
const PROTO_PATH = path.join(__dirname, 'chat.proto');

// Chargement du fichier proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

// Stockage en mémoire pour l'historique des messages
const messageHistory = [];

// Définition d'un utilisateur administrateur de base
const admin = {
  id: "admin",
  name: "Grpc_Admin",
  email: "grpc_admin@mail.com",
  status: "ACTIVE", // Assurez-vous que cela correspond à la définition de l'enum (par exemple, 1 pour ACTIVE)
};

// Implémentation de l'appel GetUser
function getUser(call, callback) {
  const userId = call.request.user_id;
  console.log(`Requête GetUser reçue pour id: ${userId}`);
  // Retourner un utilisateur fictif en se basant sur "admin" et en remplaçant l'id par celui fourni
  const user = { ...admin, id: userId }; 
  callback(null, { user });
}

// Implémentation de l'appel Chat (streaming bidirectionnel)
function chat(call) {
  console.log("Flux Chat démarré.");
  
  call.on('data', (chatStreamMessage) => {
    if (chatStreamMessage.chat_message) {
      const msg = chatStreamMessage.chat_message;
      console.log(`Message reçu de ${msg.sender_id}: ${msg.content}`);
      
      // Stocker le message original (avant la réponse écho) dans l'historique
      // On s'assure que le message a un ID, un sender_id, room_id, et content
      if (msg.id && msg.sender_id && msg.room_id && msg.content) {
        messageHistory.push(JSON.parse(JSON.stringify(msg))); // Store a copy
      }

      // Créer d'une réponse avec quelques modifications sur le message reçu
      const reply = {
        id: msg.id + "_reply",
        room_id: msg.room_id,
        sender_id: admin.name, // L'admin répond
        content: `Received at ${new Date().toISOString()}`
      };
      
      // On renvoie le message au client (écho)
      call.write({ chat_message: reply });
    }
  });
  
  call.on('end', () => {
    console.log("Fin du flux Chat.");
    call.end();
  });

  call.on('error', (err) => {
    console.error('Erreur dans le stream Chat:', err);
    call.end();
  });
}

// Implémentation de l'appel GetChatHistory
function getChatHistory(call, callback) {
  console.log('Requête GetChatHistory reçue.');
  // Retourner une copie pour éviter des modifications externes non désirées
  callback(null, { messages: JSON.parse(JSON.stringify(messageHistory)) });
}

// Démarrage du serveur gRPC
function main() {
  const server = new grpc.Server();
  server.addService(chatProto.ChatService.service, {
    GetUser: getUser,
    Chat: chat,
    GetChatHistory: getChatHistory, // Ajout de la nouvelle méthode
  });
  
  const address = '0.0.0.0:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error("Erreur lors du binding du serveur :", error);
      return;
    }
    console.log(`Serveur gRPC en écoute sur ${address}`);
  });
}

main(); 