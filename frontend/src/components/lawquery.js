import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Container, ChatBox, Header, Form, Input, Button, Message, ErrorBox, ChatHistory } from "./styles";

// Function to format the AI response, adding line breaks and bolding specific sections
const formatResponse = (text) => {
  const formattedText = text.replace(/\*\*(.*?)\*\*/g, "<br /><b>$1</b>");
  return formattedText;
};

const LawQuery = () => {
  const [query, setQuery] = useState(""); // User input query
  const [messages, setMessages] = useState([]); // List of all queries and responses
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null); // Ref for scrolling to the latest message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (query.trim() === "") return;

    // Add user query to the messages array
    const newMessage = { text: query, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // Send the query to the backend API
      const res = await axios.post("http://localhost:5000/api/gemini/query-law", { prompt: query });

      // Format AI response
      const aiResponse = formatResponse(res.data.response);
      const aiMessage = { text: aiResponse, sender: "ai" };

      // Add AI response to the messages array
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setQuery(""); // Clear the query input field
    } catch (err) {
      setError("Error fetching response. Please try again.");
    }
  };

  // Scroll to the latest message when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <ChatBox>
        <Header>Indian Law Query</Header>
        
        {/* Chat history container with scroll */}
        <ChatHistory ref={chatContainerRef}>
          {messages.map((message, index) => (
            <Message key={index} sender={message.sender}>
              {/* Rendering AI response using dangerouslySetInnerHTML to support <br /> and <b> */}
              <div dangerouslySetInnerHTML={{ __html: message.text }} />
            </Message>
          ))}
        </ChatHistory>

        {/* Form for submitting new queries */}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">Ask</Button>
        </Form>

        {error && <ErrorBox>{error}</ErrorBox>}
      </ChatBox>
    </Container>
  );
};

export default LawQuery;
