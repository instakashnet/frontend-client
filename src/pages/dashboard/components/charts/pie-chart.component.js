import React from "react";
import { Doughnut } from "react-chartjs-2";

// HELPERS
import { formatAmount } from "../../../../shared/functions";

const PieChart = ({ dataset, labels, colors }) => {
  let activeChart = false;

  dataset.forEach((value) => {
    if (value > 0) activeChart = true;
  });

  return (
    <div className="flex items-center flex-wrap">
      {!activeChart && <p className="text-center">No has completado ninguna transacción.</p>}
      {activeChart && (
        <>
          <div className="relative w-4/6">
            <Doughnut
              data={{
                datasets: [
                  {
                    data: dataset,
                    backgroundColor: [...colors],
                    borderAlign: "center",
                    borderColor: "#f6fbf9",
                    borderWidth: 5,
                  },
                ],
                labels,
              }}
              options={{
                legend: {
                  display: false,
                },
                maintainAspectRatio: false,
                aspectRatio: 1,
              }}
            />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span style={{ width: 12, height: 12, margin: 0, borderRadius: "50%", backgroundColor: colors[0] }} />
              <p className="ml-3 text-sm">$ {formatAmount(dataset[0])}</p>
            </div>
            <div className="flex items-center">
              <span style={{ width: 12, height: 12, margin: 0, borderRadius: "50%", backgroundColor: colors[1] }} />
              <p className="ml-3 text-sm">S/. {formatAmount(dataset[1])}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PieChart);
