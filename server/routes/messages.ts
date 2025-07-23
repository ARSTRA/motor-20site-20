import { RequestHandler } from "express";
import {
  ContactMessage,
  MessagesResponse,
  CreateMessageRequest,
} from "@shared/api";

// Mock database for messages
const mockMessages: ContactMessage[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    subject: "Test Drive Request",
    message:
      "I'm interested in scheduling a test drive for the BMW X5. When would be a good time?",
    carId: 1,
    status: "new",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Financing Question",
    message:
      "What financing options do you have available? I'm looking to purchase a vehicle in the $80k-$120k range.",
    status: "read",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 987-6543",
    subject: "Trade-in Inquiry",
    message:
      "I have a 2020 Audi A4 that I'd like to trade in. Can you provide an estimate?",
    status: "replied",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

// Get all messages with pagination
export const handleGetMessages: RequestHandler = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status as string;

  let filteredMessages = [...mockMessages];

  // Filter by status if provided
  if (status && status !== "all") {
    filteredMessages = filteredMessages.filter((msg) => msg.status === status);
  }

  // Sort by creation date (newest first)
  filteredMessages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  const response: MessagesResponse = {
    messages: paginatedMessages,
    total: filteredMessages.length,
    page,
    limit,
  };

  res.json(response);
};

// Get single message by ID
export const handleGetMessage: RequestHandler = (req, res) => {
  const messageId = Number(req.params.id);
  const message = mockMessages.find((m) => m.id === messageId);

  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  // Mark as read if it was new
  if (message.status === "new") {
    message.status = "read";
  }

  res.json(message);
};

// Create new message
export const handleCreateMessage: RequestHandler = (req, res) => {
  const messageData: CreateMessageRequest = req.body;

  // Basic validation
  if (!messageData.name || !messageData.email || !messageData.message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  const newMessage: ContactMessage = {
    ...messageData,
    id: Math.max(...mockMessages.map((m) => m.id)) + 1,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  mockMessages.push(newMessage);
  res.status(201).json(newMessage);
};

// Update message status (Admin only)
export const handleUpdateMessageStatus: RequestHandler = (req, res) => {
  const messageId = Number(req.params.id);
  const { status } = req.body;

  const messageIndex = mockMessages.findIndex((m) => m.id === messageId);
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  if (!["new", "read", "replied", "resolved"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  mockMessages[messageIndex].status = status;
  res.json(mockMessages[messageIndex]);
};

// Delete message (Admin only)
export const handleDeleteMessage: RequestHandler = (req, res) => {
  const messageId = Number(req.params.id);
  const messageIndex = mockMessages.findIndex((m) => m.id === messageId);

  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  mockMessages.splice(messageIndex, 1);
  res.status(204).send();
};

// Get message statistics
export const handleGetMessageStats: RequestHandler = (req, res) => {
  const stats = {
    total: mockMessages.length,
    new: mockMessages.filter((m) => m.status === "new").length,
    read: mockMessages.filter((m) => m.status === "read").length,
    replied: mockMessages.filter((m) => m.status === "replied").length,
    resolved: mockMessages.filter((m) => m.status === "resolved").length,
  };

  res.json(stats);
};
