import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostStyle, PostUser } from "../styles";

const StolenPost = () => {
  // State to hold stolen items data
  const [stolenItems, setStolenItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stolen items from the API
  useEffect(() => {
    const fetchStolenItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stolen-items");
        setStolenItems(response.data); // Set the fetched data to state
        setLoading(false); // Update loading state
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Update loading state
      }
    };

    fetchStolenItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {stolenItems.map((post) => (
        <PostStyle key={post.id}>
          <header>
            <PostUser>
              <div className="Post-user-nickname">{post.itemName}</div>
            </PostUser>
          </header>
          <div className="Post-image">
            <div className="Post-image-bg">
              <img alt="Stolen Item" src={post.image} />
            </div>
          </div>
          <div className="Post-caption">
            <strong>Quantity:</strong> {post.quantity} <br />
            <strong>Station:</strong> {post.station} <br />
            <strong>Details:</strong> {post.details} <br />
          </div>
        </PostStyle>
      ))}
    </div>
  );
};

export default StolenPost;
