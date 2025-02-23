export default function CreateStore() {
  return (
    <section className="px-5">
      <h1 className="mt-5 text-center text-xl font-semibold capitalize">
        Please provide your store information
      </h1>

      <form>
        {/* name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-2 w-full rounded border px-4 py-1 outline-none"
          />
        </div>

        {/* logo */}
        <div>
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            name="logo"
            id="logo"
            className="mt-2 w-full rounded border px-4 py-1 outline-none"
          />
        </div>

        {/* favicon */}
        <div>
          <label htmlFor="logo">Favicon:</label>
          <input
            type="file"
            name="favicon"
            id="favicon"
            className="mt-2 w-full rounded border px-4 py-1 outline-none"
          />
        </div>

        {/* theme */}
        <p>Choose Theme</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <input type="checkbox" name="theme1" id="theme1" />
            <label htmlFor="theme1">Theme1</label>
          </div>
          <div>
            <input type="checkbox" name="theme1" id="theme1" />
            <label htmlFor="theme1">Theme1</label>
          </div>
          <div>
            <input type="checkbox" name="theme1" id="theme1" />
            <label htmlFor="theme1">Theme1</label>
          </div>
          <div>
            <input type="checkbox" name="theme1" id="theme1" />
            <label htmlFor="theme1">Theme1</label>
          </div>
        </div>

        {/* social info */}
        <p>Social Links:</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name">Facebook:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
          <div>
            <label htmlFor="name">Twitter:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
          <div>
            <label htmlFor="name">Instagram:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
          <div>
            <label htmlFor="name">Youtube:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
        </div>

        {/* contact info */}
        <p>Contact Info:</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name">Mobile No:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
          <div>
            <label htmlFor="name">Telephone:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-2 w-full rounded border px-4 py-1 outline-none"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
