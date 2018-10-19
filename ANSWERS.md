<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions allow the server to store data from the client concerning their state. This is commonly used to let the server know you are authenticated.
2. What does bcrypt do to help us store passwords in a secure manner.
That module stores passwords ONLY after hashing the password. This means that it runs the password through an algorithm that randomizes the password based off the seed.
3. What does bcrypt do to slow down attackers?
Encrypts passwords that can only be decrypted with the correct passphrase.
4. What are the three parts of the JSON Web Token?
Header: holds the token type and algorithm
Payload: Holds the data, I believe it was 4kb worth.
Verify Signature: This holds the encoded header/payload and your 256 bit secret phrase