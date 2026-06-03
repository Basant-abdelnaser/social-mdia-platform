import { Inngest } from "inngest";
import User from "./models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "vibez-app" });

// inngest fun to save userdata to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];
    // check availability of username
    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 1000);
    }
    const userData = {
      _id: id,
      username,
      full_name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      profile_picture: image_url,
    };

    await User.create(userData);
  },
);

// update userdata in database
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      full_name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      profile_picture: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  },
);
// delete user from database
const syncUserDelete = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdate, syncUserDelete];
