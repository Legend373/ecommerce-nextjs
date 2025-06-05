// src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        We'd love to hear from you! Whether you have a question about our
        products, need help with an order, or just want to provide feedback, our
        team is here to help.
      </p>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
            placeholder="your@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
