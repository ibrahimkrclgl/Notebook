package com.medipol.highjava.finalexam.Notebook.Repository;

import com.medipol.highjava.finalexam.Notebook.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {


}
