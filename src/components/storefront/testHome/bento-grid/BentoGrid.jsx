const items = [
  {
    id: 1,
    title: "Card 1",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Card 2",
    image:
      "https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Card 3",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 4,
    title: "Card 4",
    image:
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Card 5",
    image:
      "https://images.unsplash.com/photo-1645561305502-63a9ba09ab09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBtb2RlbHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    id: 6,
    title: "Card 6",
    image:
      "https://images.unsplash.com/photo-1615304048636-47fa618f3744?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGZhc2hpb24lMjBtb2RlbHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    id: 7,
    title: "Card 7",
    image:
      "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    title: "Card 8",
    image:
      "https://images.unsplash.com/photo-1590131222139-91ba5992e4ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    title: "Card 9",
    image:
      "https://images.unsplash.com/photo-1619785690726-89c6b3bd3849?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    title: "Card 9",
    image:
      "https://images.unsplash.com/photo-1619785690726-89c6b3bd3849?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const layouts = {
  3: [
    "col-span-8 row-span-4 col-start-1 row-start-1",
    "col-span-4 row-span-4 col-start-9 row-start-1",
    "col-span-12 row-span-8 col-start-1 row-start-5",
  ],

  4: [
    "col-span-8 row-span-6",
    "col-span-4 row-span-12 col-start-9",
    "col-span-4 row-span-6 row-start-7",
    "col-span-4 row-span-6 col-start-5 row-start-7",
  ],

  5: [
    "col-span-4 row-span-8",
    "col-span-8 row-span-4 col-start-5",
    "col-span-4 row-span-8 col-start-9 row-start-5",
    "col-span-4 row-span-4 col-start-5 row-start-5",
    "col-span-8 row-span-4 row-start-9",
  ],

  6: [
    "col-span-4 row-span-8",
    "col-span-8 row-span-4 col-start-5",
    "col-span-4 row-span-4 col-start-5 row-start-5",
    "col-span-4 row-span-4 col-start-9 row-start-5",
    "col-span-8 row-span-4 row-start-9",
    "col-span-4 row-span-4 col-start-9 row-start-9",
  ],

  7: [
    "col-span-4 row-span-6",
    "col-span-4 row-span-6 col-start-1 row-start-7",
    "col-span-4 row-span-5 col-start-5 row-start-1",
    "col-span-4 row-span-4 col-start-5 row-start-6",
    "col-span-8 row-span-3 col-start-5 row-start-10",
    "col-span-4 row-span-4 col-start-9 row-start-1",
    "col-span-4 row-span-5 col-start-9 row-start-5",
  ],

  8: [
    "col-span-6 row-span-3",
    "col-span-6 row-span-5 col-start-1 row-start-4",
    "col-span-3 row-span-4 col-start-1 row-start-9",
    "col-span-3 row-span-2 col-start-4 row-start-9",
    "col-span-3 row-span-2 col-start-4 row-start-11",
    "col-span-6 row-span-4 col-start-7 row-start-1",
    "col-span-6 row-span-3 col-start-7 row-start-5",
    "col-span-6 row-span-5 col-start-7 row-start-8",
  ],

  9: [
    "col-span-3 row-span-6",
    "col-span-3 row-span-6 col-start-1 row-start-7",
    "col-span-3 row-span-3 col-start-4 row-start-1",
    "col-span-3 row-span-3 col-start-7 row-start-1",
    "col-span-3 row-span-6 col-start-10 row-start-1",
    "col-span-3 row-span-3 col-start-10 row-start-7",
    "col-span-3 row-span-3 col-start-4 row-start-10",
    "col-span-6 row-span-3 col-start-7 row-start-10",
    "col-span-6 row-span-6 col-start-4 row-start-4",
  ],
};

const DynamicBentoGrid = () => {
  const userImages = items.slice(0, 9);

  const count = Math.min(Math.max(userImages.length, 3), 9);
  const selectedLayout = layouts[count];
  console.log(selectedLayout.length);

  return (
    <div className="mx-auto max-w-6xl px-8 py-16">
      <div className={`grid grid-cols-12 grid-rows-12 gap-4`}>
        {userImages.map((item, index) => (
          <div
            key={item.id}
            className={`${selectedLayout[index]} overflow-hidden rounded-3xl shadow`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBentoGrid;
