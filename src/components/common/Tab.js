export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-[15px] max-w-max"
      style={{ boxShadow: "inset 0 -1px 0px rgba(255,255,255,0.18)" }}
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "text-[#f5f5dc]"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200 font-walsheimCon`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
