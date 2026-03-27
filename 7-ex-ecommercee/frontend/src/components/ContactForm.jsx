import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("Form Data:", data);
    alert("Message sent!");
  }
}

<form onSubmit={handleSubmit(onsubmit)}>
  <input {...register("name", { required: "Name is required" })} />
  {errors.name && <span>{errors.name.message}</span>}

  <input {...register("email", { required: "Email is required" })} />
  {errors.email && <span>{errors.email.message}</span>}
  <textarea
    {...register("message", { required: "Message is required" })}
  ></textarea>
  {errors.message && <span>{errors.message.message}</span>}
  <button className="btn btn-primary">Send</button>
</form>;
