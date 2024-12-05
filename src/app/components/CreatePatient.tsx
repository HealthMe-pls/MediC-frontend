export default function CreatePatient() {
  return (
    <div className="max-w-md mx-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Patient</h1>
      <form action="/api/patient" method="post" className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <input
            id="name"
            name="Name"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            id="email"
            name="Email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's email"
          />
        </div>
        <div>
          <label htmlFor="age" className="block font-semibold">
            Age
          </label>
          <input
            id="age"
            name="Age"
            type="number"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's age"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 mt-4"
        >
          Create Patient
        </button>
      </form>
    </div>
  );
}
