import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper, Alert, Grid } from "@mui/material";
import axios from "axios"; // Import axios for making HTTP requests

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1); // Default to 1
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState(""); // New state to store details of the item
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stolenItems, setStolenItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  // Fetch the existing stolen items from the backend
  const fetchStolenItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stolen-items");
      setStolenItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again.");
    }
  };

  // Call fetch function when the component mounts
  useEffect(() => {
    fetchStolenItems();
  }, []);

  // Handle form submission (Add or Update item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !imageUrl || !place || !details) {
      setError("All fields are required!");
      return;
    }

    const newStolenItem = {
      itemName: name,
      image: imageUrl,
      quantity: String(quantity), // Make sure quantity is a string
      station: place,
      details: details, // New details field
    };

    try {
      if (editingItemId) {
        // Update the item if we are editing an existing item
        await axios.put(`http://localhost:5000/api/stolen-items/${editingItemId}`, newStolenItem);
        setSuccess("Item successfully updated!");
      } else {
        // Add a new item if we are not editing
        await axios.post("http://localhost:5000/api/stolen-items", [newStolenItem]);
        setSuccess("Item successfully added!");
      }

      // Reset the form and refresh the items
      setName("");
      setImageUrl("");
      setQuantity(1);
      setPlace("");
      setDetails(""); // Reset the details field
      setEditingItemId(null);
      fetchStolenItems();
    } catch (error) {
      setError("Error adding/updating item. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stolen-items/${id}`);
      setSuccess("Item successfully deleted!");
      fetchStolenItems(); // Refresh the items after delete
    } catch (error) {
      setError("Error deleting item. Please try again.");
    }
  };

  // Handle editing an existing item
  const handleEdit = (item) => {
    setName(item.itemName);
    setImageUrl(item.image);
    setQuantity(item.quantity);
    setPlace(item.station);
    setDetails(item.details); // Pre-fill the details for editing
    setEditingItemId(item._id); // Set the id for the item being edited
  };

  return (
    <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: "2rem", width: "500px" }}>
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
            value={details}
            onChange={(e) => setDetails(e.target.value)} // New field for item details
            multiline
            rows={4} // Allow for multiple lines in the details field
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

        {/* Display existing items */}
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
                <Typography variant="body2"><strong>Details:</strong> {item.details}</Typography> {/* Display the details */}
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
