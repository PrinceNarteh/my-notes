export function formatMongoDBErrors(error: any, schema: string) {
  const errorMessage = error.message.replace(
    `${schema} validation failed: `,
    ""
  );
  const errorArr = errorMessage
    .split(", ")
    .map((err: string) => err.split(": ")[1]);
  return errorArr;
}
