import React from "react";
import { AttachMoney } from "@material-ui/icons";
import Skeleton from "react-loading-skeleton";

// COMPONENTS
import Card from "../../../../components/UI/card.component";
import PieChart from "./pie-chart.component";

// CLASSES
import sharedClass from "../../assets/css/sharedClasses.module.scss";

const TransferedCharts = ({ isLoading, orderAmounts }) => {
  return (
    <div className={`${sharedClass.DashboardCard} w-full hidden md:block`}>
      <h2 className="flex items-center mb-2">
        <AttachMoney className="mr-2" fontSize="medium" /> Total cambiado
      </h2>
      {isLoading && <Skeleton height={300} />}
      {!isLoading && (
        <Card className="px-3 md:px-8 py-6 flex flex-col justify-center">
          <div className="mb-4 flex flex-col justify-center">
            <h4>Dólares a Soles</h4>
            <PieChart dataset={orderAmounts.buy ? orderAmounts.buy : [0, 0]} labels={["$", "S/."]} colors={["#FF912B", "#69BEA0"]} />
          </div>
          <div className="my-4 flex flex-col justify-center">
            <h4>Soles a Dólares</h4>
            <PieChart dataset={orderAmounts.sell ? orderAmounts.sell : [0, 0]} labels={["$", "S/."]} colors={["#20A2A5", "#FFBD80"]} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default React.memo(TransferedCharts);
