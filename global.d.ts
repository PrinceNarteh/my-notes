import mongoose from "mongoose";

declare global {
  var mongoose = ReturnType<mongoose>;
}
