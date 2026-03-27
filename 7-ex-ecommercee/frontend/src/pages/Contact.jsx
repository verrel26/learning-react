import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("Form submitted:", data);
    alert("Message sent! (Backend belum ada)");
    // TODO: Kirim ke backend nanti
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              <strong>Name:</strong> Panjul
            </p>
            <p>
              <strong>Email:</strong> panjul@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +62 896-1241-4182
            </p>
            <p>
              <strong>Address:</strong> Padang, Indonesia
            </p>
          </div>
          <div className="contact-form">
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="form-error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="form-input"
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <span className="form-error">{errors.message.message}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
