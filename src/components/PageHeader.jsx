function PageHeader({ title, inputVal, onInputVal, inputRef, customersLength, managePage, onShowTab,showTab }) {
    return <div className="bg-b-gradient-2 text-white w-full p-6 md:py-8 flex flex-col gap-y-6 md:gap-y-12 items-center justify-between rounded-b-3xl xl:rounded-b-full text-fr-blue-200 border-2 border-t-0 border-fr-blue-200">
        <h1 className="text-xl md:text-4xl font-semibold">
            {title}
        </h1>
        {managePage ? <div id="tabs" className="flex cursor-pointer gap-x-4">
            <div
                className={`rounded md:px-6 md:py-2 md:text-lg text-base px-3 py-1  ${showTab ? "bg-fr-blue-200 text-white border" : "bg-white text-black"
                    }`}
                onClick={()=>onShowTab(true)}
            >
                Listed
            </div>
            <div
                className={`rounded  md:px-5 md:py-2 md:text-lg text-base px-3 py-1  ${!showTab ? "bg-fr-blue-200 text-white border" : "bg-white text-black"
                    }`}
                onClick={()=>onShowTab(false)}
            >
                Favorites
            </div>
        </div> :
            <div className="flex flex-col md:flex-row gap-6 xl:w-7/12 w-full items-center">
                <input
                    className="bg-transparent block w-full mt-1 rounded-md md:p-2 p-1 text-sm md:text-base border border-white outline-none"
                    placeholder={"Search customer..."}
                    value={inputVal}
                    ref={inputRef}
                    onChange={(e) => onInputVal(e.target.value)}
                />
                <p className="font-semibold md:text-2xl text-nowrap">
                    Total: {customersLength}
                </p>
            </div>

        }
    </div>

}

export default PageHeader