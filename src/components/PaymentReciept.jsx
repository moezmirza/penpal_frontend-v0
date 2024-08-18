import { roundTo } from "../utils/sharedMethods";
import { addonStatetoCost, addonStateToNameMap, basicInfoFieldLabelMap, stateFieldNameMap } from "../utils/sharedState";
function PaymentReceipt({ obj, onDelDueItem }) {
    console.log("object receipt", obj)
    let total = 0;
    Object.keys(obj).forEach((field) => {
        if (field == "personalityInfo" || field == "basicInfo") {
            total += Object.keys(obj[field]).reduce((acc, curr) => {
                if (obj[field][curr]) return acc + 9.95;
                return acc;
            }, 0);
        } else if (field == "wordLimit" || field == "totalPaidPhotos") {
            total += obj[field] * 9.95;

        } else if (field == "premiumPlacement" || field == "featuredPlacement") {
            console.log("prem obj field", obj[field], addonStatetoCost[field])
            total += obj[field] * addonStatetoCost[field]
        }
        else {
            console.log("field", field, "cost", addonStatetoCost[field]);
            total += obj[field] ? addonStatetoCost[field] : 0;
        }
    });
    total = roundTo(total, 2);

    const unGroupFieldsMap = {
        "totalPaidPhotos": "Photos/Artworks",
        "wordLimit": "Bio word limit"
    }

    return (
        <div className="flex flex-col gap-y-4 my-4">
            {Object.keys(obj).map((field) => {
                return field == "personalityInfo" ? (
                    Object.keys(obj["personalityInfo"]).map(
                        (field) =>
                            obj["personalityInfo"][field] && (
                                <RecieptItem field={field} cost={9.95} nameMap={stateFieldNameMap} onDelDueItem={onDelDueItem} type={"personalityInfo"} />
                            )
                    )
                ) : field == "basicInfo" ? (
                    Object.keys(obj["basicInfo"]).map(
                        (field) =>
                            obj["basicInfo"][field] && (
                                <RecieptItem field={field} cost={9.95} nameMap={basicInfoFieldLabelMap} onDelDueItem={onDelDueItem} type={"basicInfo"} />
                            )
                    )
                ) : field == "totalPaidPhotos" && obj["totalPaidPhotos"] != 0 ? (
                    <RecieptItem field={field} cost={roundTo(9.95 * obj[field], 2)} onDelDueItem={onDelDueItem} nameMap={unGroupFieldsMap} />
                ) : field == "wordLimit" && obj["wordLimit"] != 0 ? (
                    <RecieptItem field={field} cost={roundTo(9.95 * obj[field], 2)} onDelDueItem={onDelDueItem} nameMap={unGroupFieldsMap} />
                ) :
                    field == "premiumPlacement" && obj["premiumPlacement"] != 0 ? (
                        <RecieptItem field={field} cost={roundTo(24.95 * obj[field], 2)} onDelDueItem={onDelDueItem} nameMap={addonStateToNameMap} />
                    ) :
                        field == "featuredPlacement" && obj["featuredPlacement"] != 0 ? (
                            <RecieptItem field={field} cost={roundTo(14.95 * obj[field], 2)} onDelDueItem={onDelDueItem} nameMap={addonStateToNameMap} />
                        ) : (
                            obj[field] == true && (
                                <RecieptItem field={field} cost={addonStatetoCost[field]} onDelDueItem={onDelDueItem} nameMap={addonStateToNameMap} />
                            )
                        );
            })}

            <hr />
            <div className="flex justify-between">
                <p>Total</p>
                <p>${total}</p>
            </div>
        </div>
    );

};


function RecieptItem({ field, nameMap, cost, onDelDueItem, type }) {
    return <div className="flex justify-between">
        <p>{nameMap[field]}</p>
        <p className="flex gap-x-8">${cost}
            {onDelDueItem &&
                <img src="/assets/icons/xMarkGray.svg" onClick={() => onDelDueItem(field, type)} alt="" className=" h-6 cursor-pointer  rounded hover:bg-gray-200 px-1 p-0.5" />
            }
        </p>
    </div>
}

export default PaymentReceipt