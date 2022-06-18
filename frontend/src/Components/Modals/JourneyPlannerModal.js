import React from "react";
import "./JourneyPlannerModal.css";

const JourneyPlannerModal = () => {
  return (
    <div>
      <div className="head">
        <h5 className="text-xl font-medium text-white pb-4">
          Plan Your Journey
        </h5>
      </div>
      <div className="form-inputs">
        <label
          for="start"
          class="block text-sm font-medium text-gray-300 center"
        >
          Start:
        </label>
        <select name="start">
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>

        <label
          for="stop"
          class="block text-sm font-medium text-gray-300 center"
        >
          Stop:
        </label>
        <select name="stop">
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </div>
    </div>
  );
};

export default JourneyPlannerModal;
