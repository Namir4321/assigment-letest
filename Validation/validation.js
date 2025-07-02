const z = require("zod");

const validateWithZodSchema = async (schema, data) => {
  // console.log(data);
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
};

const CreateBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genere: z.string().min(1, "Author is required"),
  publishedyear: z
    .number({ invalid_type_error: "Published Year must be a number" })
    .int("Published Year must be an integer")
    .gte(1000, "Published Year must be a valid year")
    .lte(new Date().getFullYear(), "Published Year cannot be in the future"),
});
const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

module.exports = {
  validateWithZodSchema,
  CreateBookSchema,
  RegisterSchema,
  LoginSchema
};
