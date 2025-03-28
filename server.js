//import necessary modules
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

//creating instances of imports to use
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

const botName = process.env.BOT_NAME;
import { getJoke, getRiddle, getFact } from "./Helpers/getHelpers.js";
//creating a new socket.io server with CORS config
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//when a new client connects to the server
io.on("connection", (socket) => {
  //log the user's ID
  console.log(`User Connected: ${socket.id}`);

  //emitting the first choice for user to see
  socket.emit(
    "bot-reply",
    `Hi, my name is ${botName} would you like to hear a joke or a riddle?`
  );

  //listening for "chat-message" from socket
  socket.on("chat-message", async (message) => {
    const trimmedMessage = message.trim();
    //log for testing
    console.log("Received message:", trimmedMessage.toLowerCase());

    //if else block to determine response from socket
    if (trimmedMessage.toLowerCase() === "joke") {
      try {
        const joke = await getJoke();
        socket.emit("bot-reply", joke);
        setTimeout(() => {
          socket.emit(
            "bot-reply",
            "Want to hear another? Simply say Joke or Riddle."
          );
        }, 5000);
      } catch (error) {
        socket.emit(
          "bot-reply",
          "Sorry, there was an error fetching the joke."
        );
      }
    } else if (trimmedMessage.toLowerCase() === "riddle") {
      try {
        const riddle = await getRiddle();
        socket.emit("bot-reply", riddle);
        setTimeout(() => {
          socket.emit(
            "bot-reply",
            "Want to hear another? Simply say Joke or Riddle."
          );
        }, 5000);
      } catch (error) {
        socket.emit(
          "bot-reply",
          "Sorry, there was an error fetching the riddle."
        );
      }
    } else if (trimmedMessage.toLowerCase() === "fact") {
      try {
        const fact = await getFact();
        socket.emit("bot-reply", fact);
        setTimeout(() => {
          socket.emit("bot-reply", "For more facts, say fact.");
        }, 5000);
      } catch (error) {
        socket.emit(
          "bot-reply",
          "Sorry, there was an error fetching the fact."
        );
      }
    } else {
      try {
        const fact = await getFact();
        setTimeout(() => {
          socket.emit(
            "bot-reply",
            "Hmmm, don't like jokes or riddles? Here's a fact."
          );
        }, 3000);
        setTimeout(() => {
          socket.emit("bot-reply", fact);
        }, 5000);
        setTimeout(() => {
          socket.emit("bot-reply", "To hear another say fact.");
        }, 7000);
      } catch (error) {
        socket.emit("bot-reply", "Sorry I'm having trouble right now.");
      }
    }
  });

  //log when user dissconnects
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected.`);
  });
});

//start the server and listen on port, log to indicate running
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
