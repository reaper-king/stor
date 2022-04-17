<script>
let value
// let search = async()=> {
// 		const response = await self.fetch(`api/search/${value}`)
//       let {stor_pax} = await response.json()
// 		if (response.ok) {
//   		return await stor_pax;
			
// 		} else {
// 			throw new Error('error');
// 		}
// 	}


  async function search() {
		const res = await fetch(`api/search/${value}`)
		const jsn = await res.json();
    
		if (res.ok) {
	return jsn;
		} else {
			throw new Error(jsn.status);
		}
	}


  const onKeyPress = e => {
    if (e.charCode === 13){
      handleClick() 
    }
  };

let promise = search();

function handleClick() {
		// Now set it to the real fetch promise 
    promise = search();

	}

	// {JSON.stringify(king)}
</script>


<div class="w-full h-fit grid place-items-center">
	<div class="flex items-center justify-center  pb-20 mt-20">
		<div class="flex border-2 rounded">
			<input type="text" class="px-4 py-2 w-80" placeholder="Search..."  on:keypress={onKeyPress}  bind:value> 
			<button class="flex items-center justify-center px-4 border-l bg-gray-50 hover:bg-gray-100 active:bg-gray-200"  on:click={ handleClick }>
				<svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24">
					<path
						d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
				</svg>
			</button>
		</div>
	</div>

	{#if promise }
	{#await promise}
		<p>...Searching</p>
	{:then  stor_pax  }
		<div class="w-3/4 overflow-y-auto relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="text-sm  w-full text-left text-gray-500 ">
		<thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
		<tr>
		<th scope="col" class="px-6 py-3">
		Summary Form
		</th>
		<th scope="col" class="px-6 py-3">
		Passport
		</th>
		<th scope="col" class="px-6 py-3">
		Name
		</th>
		<th scope="col" class="px-6 py-3">
		Flight
		</th>
		<th scope="col" class="px-6 py-3">
		Arrival
		</th>
		<th scope="col" class="px-6 py-3">
		Created
		</th>
		</tr>
		</thead>
		<tbody class=" font-medium text-gray-900  whitespace-nowrap ">
		
		
	{#each stor_pax.stor_pax as passenger }

		<tr class="bg-white border-b ">
		<th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
			<a  href={`/request-${passenger.qr}.pdf`} class="font-medium text-blue-600  hover:underline" download>Download</a>
		</th>
		<td class="px-6 py-4">
			{passenger.passport_number}
		</td>
		<td class="px-6 py-4">
			{passenger.last_name}, {passenger.first_name}
		</td>
		<td class="px-6 py-4">
			{passenger.flight} 
		</td>
		<td class="px-6 py-4">
			 {passenger.date_of_arrival}
		</td>
		<td class="px-6 py-4">
			 {passenger.created}
		</td>
		</tr>
		
		{/each}
	
		</tbody>
		</table>
		</div>
				
		{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
		{/if}
</div>