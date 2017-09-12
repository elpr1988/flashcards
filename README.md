Backend for a basic flashcard application. Allows users to create two types of flashcards and review them. When the user reviews the flashcards, they can input their answers and check if they are correct or incorrect.

1. **Basic** flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").

2. **Cloze-Deleted** flashcards, which have the full text ("George Washington was the first president of the United States."), and the cloze deletion ("George Washington").

A **cloze deletion** is simply a sentence that has had some of its text removed. For example, given the example above the application wil present the following:

**Full Text:**
"George Washington was the first president of the United States."

**Cloze Deletion:**
"George Washington"

When reviewing the flashcard the user sees this:
"... was the first president of the United States."
