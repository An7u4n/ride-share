"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { getUserFromToken } from "@/lib/auth";

export default function Chat({ tripId }: { tripId: number }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [inRoom, setInRoom] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await getUserFromToken();
                if (!user) {
                    console.error("User not logged in");
                    return;
                }
                setUsername(user.name);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        
        fetchUser();
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            socket.emit("joinRoom", tripId);
        }

        function onDisconnect() {
            setIsConnected(false);
            setInRoom(false);
        }

        function onRoomJoined(room: number) {
            setInRoom(true);
        }

        function onChatMessage({ username, message }: { username: string; message: string }) {
            console.log("Received message:", message);
            setMessages((prevMessages) => [...prevMessages, `${username}: ${message}`]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("roomJoined", onRoomJoined);
        socket.on("chat:message", onChatMessage);

        if (socket.connected && !inRoom) {
            onConnect();
        }

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("roomJoined", onRoomJoined);
            socket.off("chat:message", onChatMessage);
        };
    }, [tripId, inRoom]);

    const sendMessage = () => {
        if (message.trim() && isConnected && inRoom) {
            console.log(`Sending message to room ${tripId}: ${message}`);
            socket.emit("chat:message", { room: tripId, message, username });
            
            setMessages((prevMessages) => [...prevMessages, `Me: ${message}`]);
            setMessage("");
        } else if (!isConnected) {
            console.error("Cannot send message: Socket not connected");
        } else if (!inRoom) {
            console.error("Cannot send message: Not in room yet");
        }
    };

    return (
        <div className="text-blue-400">
            <h1 className="text-2xl font-bold">Chat</h1>
            <div className="flex flex-col gap-4">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className="bg-white p-2 rounded shadow">
                                {msg}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Type your message..."
                        disabled={!isConnected || !inRoom}
                    />
                    <button
                        onClick={sendMessage}
                        className={`${isConnected && inRoom ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white px-4 py-2 rounded`}
                        disabled={!isConnected || !inRoom}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}