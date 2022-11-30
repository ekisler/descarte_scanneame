import React from "react";


export default function Paginado({ allCars, carsPerPage, paginate, page, number, numberPaginate, cars }) {


    const pageNumber = [];//Numero de paginado por cada 3 cars
    for (let i = 1; i <= Math.ceil(allCars / carsPerPage); i++) {
        pageNumber.push(i);
    }

    const next = () => {
        if (page < pageNumber.length) paginate(page + 1);
        if (page > number + 1 && page < pageNumber.length) numberPaginate(number + 1);
    }

    const previous = () => {
        if (page > 1) paginate(page - 1)
        if (page < number + 1 && page > 1) numberPaginate(number - 1);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul class="inline-flex items-center -space-x-px grind gap-2">
                <li>
                    <button onClick={() => { previous() }} class="text-white rounded-l-lg shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none  font-medium text-lg px-4 py-3 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800">
                        <span class="sr-only">Previous</span>
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </button>
                </li>

                <li>
                    <button onClick={() => { paginate(number) }} class={page === number ? "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-blue-900 " : "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900"}>
                        {number}
                    </button>
                </li>
                {
                    (cars.length > carsPerPage || cars.length >= carsPerPage * 2) && (
                        <li>
                            <button onClick={() => { paginate(number + 1) }} class={page === number + 1 ? "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-blue-900 " : "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900"}>
                                {number + 1}
                            </button>
                        </li>
                    )}

                {
                    (cars.length > carsPerPage * 2 || cars.length >= carsPerPage * 3) && (
                        <li>
                            <button onClick={() => { paginate(number + 2) }} class={page === number + 2 ? "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-blue-900 " : "text-white shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900"}>
                                {number + 2}
                            </button>
                        </li>
                    )}
                <li>
                    <button onClick={() => { next() }} class="text-white rounded-r-lg shadow-md shadow-black bg-blue-900 hover:bg-blue-900 focus:outline-none   font-medium text-lg px-4 py-3 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800">
                        <span class="sr-only">Next</span>
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}