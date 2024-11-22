import {styled} from 'styled-components'

export const PostStyle = styled.div`
border-radius: 3px;

border: 1px solid #e6e6e6;

background-color: #fff;

margin-top: 20px;

margin-bottom: 60px;

margin-left : 20%;

margin-right: 20%;


.Post-user-profilepicture {

width: 30px;

height: 30px;

}

.Post-user-profilepicture img {

width: 100%;

height: 100%;

border-radius: 50%;

}

.Post-user-nickname {

margin-left: 12px;

font-family: 'PT Sans', sans-serif;

font-weight: bold;

}

.Post-image-bg {

background-color: #efefef;

}

.Post-image img {

display: block;

width: 100%;

}

.Post-caption {

padding: 16px 16px;

}

.Post-caption strong {

font-family: 'PT Sans', sans-serif;

font-weight: bold;

}

.vjs-fade-out {

display: none;

visibility: hidden;

opacity: 0;

}
`

export const PostUser = styled.div`
display: flex;

padding: 16px;

align-items: center;
`

// Container for the entire chat application
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
`;

// Chatbox that contains the header, messages, and input form
export const ChatBox = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust width to fit the screen */
  height: 90%; /* Make the chatbox take up most of the screen */
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Header section for the chat
export const Header = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #3a3a3a;
  margin-bottom: 20px;
`;

// Form to submit new queries
export const Form = styled.form`
  display: flex;
  margin-top: auto;
  width: 100%;
  padding: 10px;
`;

// Input field for user query
export const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  outline: none;
  flex-grow: 1;
`;

// Submit button for sending the query
export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 20%;

  &:hover {
    background-color: #0056b3;
  }
`;

// Message container for each user or AI message
export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender === "ai" ? "flex-start" : "flex-end")};
  margin-bottom: 15px;
  
  div {
    max-width: 80%;
    padding: 8px;
    background-color: ${(props) => (props.sender === "ai" ? "#f1f1f1" : "#007bff")};
    color: ${(props) => (props.sender === "ai" ? "#333" : "white")};
    border-radius: 10px;
    word-wrap: break-word;
  }
`;

// Error box for displaying errors
export const ErrorBox = styled.div`
  color: red;
  text-align: center;
  margin-top: 15px;
`;

// Chat history container with overflow for scrolling
export const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  max-height: calc(100% - 120px); /* Ensure the chat doesn't overflow into the form */
`;