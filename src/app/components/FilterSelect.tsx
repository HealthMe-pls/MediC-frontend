
const FilterSelect = () => {
  return (
    <select
      className="w-full p-3 border border-gray-300 rounded-md"
      defaultValue=""
    >
      <option value="">Select Filter</option>
      <option value="type1">Filter Type 1</option>
      <option value="type2">Filter Type 2</option>
    </select>
  );
};

export default FilterSelect;
