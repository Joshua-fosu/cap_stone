function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/* This function takes last element as pivot, places
  the pivot element at its correct position in sorted
  array, and places all smaller (smaller than pivot)
  to left of pivot and all greater elements to right
  of pivot */
function partition(arr, low, high) {
  // pivot
  let pivot = new Date(arr[high].createdAt).getTime();

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (new Date(arr[j].createdAt).getTime() < pivot) {
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
function quickSort(arr, low, high) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    let pi = partition(arr, low, high);

    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

// Function to print an array

// Driver Code
export function sortPosts(arr, n) {
  quickSort(arr, 0, n - 1);
  //   const postR = arr.reverse();

  //
  //   printArray(postR, postR.length);
  const postReversed = arr.reverse();
  return postReversed;
}
