import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper, Alert, Grid } from "@mui/material";
import axios from "axios"; // Import axios for making HTTP requests

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1); // Default to 1
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState(""); // Details for the item
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stolenItems, setStolenItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const fetchStolenItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stolen-items");
      setStolenItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again.");
    }
  };

  useEffect(() => {
    fetchStolenItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !imageUrl || !place || !details) {
      setError("All fields are required!");
      return;
    }

    const newStolenItem = {
      itemName: name,
      image: imageUrl,
      quantity: String(quantity), // Make sure quantity is a string
      station: place,
      details, // Include details
    };

    try {
      if (editingItemId) {
        await axios.put(`http://localhost:5000/api/stolen-items/${editingItemId}`, newStolenItem);
        setSuccess("Item successfully updated!");
      } else {
        await axios.post("http://localhost:5000/api/stolen-items", [newStolenItem]);
        setSuccess("Item successfully added!");
      }

      setName("");
      setImageUrl("");
      setQuantity(1);
      setPlace("");
      setDetails("");
      setEditingItemId(null);
      fetchStolenItems();
    } catch (error) {
      setError("Error adding/updating item. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stolen-items/${id}`);
      setSuccess("Item successfully deleted!");
      fetchStolenItems();
    } catch (error) {
      setError("Error deleting item. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setName(item.itemName);
    setImageUrl(item.image);
    setQuantity(item.quantity);
    setPlace(item.station);
    setDetails(item.details);
    setEditingItemId(item._id);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          width: "80%", // Make the dashboard wider
          maxWidth: "1200px", // Optional max width for responsiveness
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
          Admin Dashboard
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <TextField
            label="Station Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <TextField
            label="Details"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "1rem" }}
          >
            {editingItemId ? "Update Item" : "Add Stolen Item"}
          </Button>
        </form>

        <Typography variant="h5" sx={{ marginTop: "2rem", textAlign: "center" }}>
          Existing Items
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          {stolenItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Paper elevation={3} sx={{ padding: "1rem" }}>
                <Typography variant="h6">{item.itemName}</Typography>
                <img src={item.image} alt={item.itemName} style={{ width: "100%" }} />
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2">Place: {item.station}</Typography>
                <Typography variant="body2">Details: {item.details}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DashboardPage;
