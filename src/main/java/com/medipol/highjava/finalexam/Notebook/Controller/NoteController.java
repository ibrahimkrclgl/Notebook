package com.medipol.highjava.finalexam.Notebook.Controller;

import com.medipol.highjava.finalexam.Notebook.Entity.Note;
import com.medipol.highjava.finalexam.Notebook.Service.NoteService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @ApiOperation(value = "Get all notes", notes = "Returns a list of all notes")
    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @ApiOperation(value = "Get a note by ID", notes = "Returns a single note based on the ID")
    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        Optional<Note> note = noteService.getNoteById(id);
        return note.orElse(null);
    }

    @ApiOperation(value = "Create a new note", notes = "Creates a new note")
    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createOrUpdateNote(note);
    }

    @ApiOperation(value = "Update an existing note", notes = "Updates an existing note based on the ID")
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        updatedNote.setId(id);
        return noteService.createOrUpdateNote(updatedNote);
    }

    @ApiOperation(value = "Delete a note by ID", notes = "Deletes a note based on the ID")
    @DeleteMapping("/{id}")
    public void deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
    }
}
