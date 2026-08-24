import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return Response.json({ message: "Account created successfully " });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}