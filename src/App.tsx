import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Edit from "./pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };

  const createNote = (noteData: NoteData): void => {
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, updatedData: NoteData) => {
    const updated = notes.map((note) => {
      if (note.id === id) {
        return { id, ...updatedData };
      } else {
        return note;
      }
    });

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main notes={notes} availableTags={tags} />} />
        <Route
          path="/new"
          element={
            <Create
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
