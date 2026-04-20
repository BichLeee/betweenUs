import { initSocket } from "@/socket/socket";
import { useEffect } from "react";

export const useSocket = (spaceId: string, handlers?: any) => {
    useEffect(() => {
        const socket = initSocket();

        socket.emit("join_space", { spaceId });

        // register listeners
        if (handlers?.onLocked) {
            socket.on("line_locked", handlers.onLocked);
        }

        if (handlers?.onUnlocked) {
            socket.on("line_unlocked", handlers.onUnlocked);
        }

        if (handlers?.onUpdated) {
            socket.on("line_updated", handlers.onUpdated);
        }

        if (handlers?.onLockFailed) {
            socket.on("lock_failed", handlers.onLockFailed);
        }

        if (handlers?.onLineCreated) {
            socket.on("line_created", handlers.onLineCreated);
        }

        return () => {
            socket.emit("leave_note", { spaceId });
            socket.off("line_locked", handlers?.onLocked);
            socket.off("line_unlocked", handlers?.onUnlocked);
            socket.off("line_updated", handlers?.onUpdated);
            socket.off("lock_failed", handlers?.onLockFailed);
            socket.off("line_created", handlers?.onLineCreated);
        };
    }, [spaceId]);
};
