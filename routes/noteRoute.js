import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controller/noteController.js";

const route = express.Router();

route.post("/create", createNote);
route.get("/getall", getNotes);
route.put("/update/:id", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;
