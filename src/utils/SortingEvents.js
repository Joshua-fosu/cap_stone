// Javascript implementation of QuickSort

// A utility function to swap two elements
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function distance(lat1, lon1, lat2, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
of pivot */
function partition(arr, low, high, userPositionLat, userPositionLong) {
  // pivot
  let eventVenueLat = arr[high]._embedded.venues[0].location.latitude;
  let eventVenueLong = arr[high]._embedded.venues[0].location.longitude;

  let pivot = distance(
    userPositionLat,
    userPositionLong,
    eventVenueLat,
    eventVenueLong
  );
  console.log("pivot", pivot);

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    let currEventVenueLat = arr[j]._embedded.venues[0].location.latitude;
    let currEventVenueLong = arr[j]._embedded.venues[0].location.longitude;

    let currPivot = distance(
      userPositionLat,
      userPositionLong,
      currEventVenueLat,
      currEventVenueLong
    );

    if (currPivot < pivot) {
      // Increment index of
      // smaller element
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

/* The main function that implements QuickSort
		arr[] --> Array to be sorted,
		low --> Starting index,
		high --> Ending index
*/
function quickSort(arr, low, high, userPositionLat, userPositionLong) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    let pi = partition(arr, low, high, userPositionLat, userPositionLong);

    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1, userPositionLat, userPositionLong);
    quickSort(arr, pi + 1, high, userPositionLat, userPositionLong);
  }
}

// Function to print an array

export function sortEvents(events, userPositionLat, userPositionLong) {
  quickSort(events, 0, events.length - 1, userPositionLat, userPositionLong);
  return events;
}
