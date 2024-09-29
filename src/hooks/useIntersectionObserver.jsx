import { useRef, useState, useEffect } from 'react';

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0 
}) => {
  const [entries, setEntries] = useState([]);
  const [observedNodes, setObservedNodes] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    // If the observer has been initialized before, disconnect from all the previous nodes
    // to prevent memory leaks
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create a new IntersectionObserver and set the root, rootMargin, and threshold
    observer.current = new IntersectionObserver(entries => setEntries(entries), {
      root,
      rootMargin,
      threshold
    });

    // Get the current observer from the observer ref
    const { current: currentObserver } = observer;

    // For each node in the observedNodes array, observe it
    for (const node of observedNodes) {
      currentObserver.observe(node);
    }

    // Return a cleanup function that disconnects the observer from all the nodes
    // when the component is unmounted
    return () => currentObserver.disconnect();
  }, [observedNodes, root, rootMargin, threshold]);

  // Return an array with the intersection entries and the function to set the observed nodes
  return [entries, setObservedNodes];
};

export default useIntersectionObserver;