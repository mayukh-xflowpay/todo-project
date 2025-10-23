"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormTodo } from "./interfacesAndTypes/formData.type";

export default function Form(
  mutateAsync: (data: FormTodo) => Promise<any>,
  isPending: boolean,
  defaultData?: FormTodo
) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register("title", { required: true, minLength: 3 })} />
      {errors.title?.type === "required" && (
        <p role="alert">Title is required</p>
      )}
      {errors.title?.type === "minLength" && (
        <p role="alert">Title should be at least 3 characters long</p>
      )}
      <label>Description</label>
      <textarea {...register("description")} />
      <label>Completed</label>
      <input type="checkbox" {...register("completed")} />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}
