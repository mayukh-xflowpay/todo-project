"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormTodo } from "./interfacesAndTypes/formData.type";
import Link from "next/link";

interface FormProps {
  mutateAsync: (data: FormTodo) => Promise<any>;
  isPending: boolean;
  defaultData?: FormTodo;
  mode?: "create" | "edit";
}

export default function Form({
  mutateAsync,
  isPending,
  defaultData,
  mode = "create",
}: FormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTodo>({
    defaultValues: defaultData,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormTodo> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Todo
      </h2>

      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title", { required: true, minLength: 3 })}
          type="text"
          placeholder="Enter todo title"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {errors.title?.type === "required" && (
          <p className="text-red-500 text-sm mt-1">Title is required</p>
        )}
        {errors.title?.type === "minLength" && (
          <p className="text-red-500 text-sm mt-1">
            Title must be at least 3 characters
          </p>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter todo description"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
        />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          {...register("completed")}
          className="w-4 h-4 accent-blue-500"
        />
        <label className="text-gray-700">Mark as completed</label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className={`px-4 py-2 rounded-md text-white ${
            isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPending
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
              ? "Update Todo"
              : "Create Todo"}
        </button>

        <Link href={"/todos"}>
          {" "}
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
