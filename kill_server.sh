#!/bin/bash

pid1="$(fuser 8000/tcp 2>/dev/null)"
pid2="$(fuser 3000/tcp 2>/dev/null)"

if [ ! -z "$pid1" ]; then
	kill "$pid1"
	echo "Process $pid1 was successfully killed"
fi
if [ ! -z "$pid2" ]; then
	kill "$pid2"
	echo "Process $pid2 was successfully killed"
fi
