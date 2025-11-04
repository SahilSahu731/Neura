"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUI from "./GroupSizeUI";
import BudgetUI from "./BudgetUI";
import TripDurationUI from "./TripDurationUI";
import FinalUI from "./FinalUI";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

type TripInfo = {
  budget: string;
  destination: string;
  group_size: string;
  duration: string;
  origin: string;
  hotels: any;
  itinerary: any;
};

const Chatbox = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [tripDetail, setTripDetail] = useState<string>("");
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput,
    };
    setMessages((prev: Message[]) => [...prev, newMsg]);
    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });
    setLoading(false);
    console.log("API Response:", result.data);
    if (isFinal) {
      setTripDetail(result?.data?.resp || "");
    } else {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.trip_plan || "",
          ui: result?.data?.ui || "",
        },
      ]);
    }
  };

  const renderGenUI = (ui: string) => {
    console.log(ui);
    if (ui == "budget") {
      return (
        <BudgetUI
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      return (
        <GroupSizeUI
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "tripDuration") {
      return (
        <TripDurationUI
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "final") {
      return (
        <FinalUI viewtrip={() => console.log("object")} disable={!tripDetail} />
      );
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final" && !isFinal) {
      setIsFinal(true);
      setUserInput("Generate my trip plan");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[83vh] flex flex-col">
      {messages.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}
      {/* message */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {renderGenUI(msg?.ui ?? "")}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin"></Loader>
            </div>
          </div>
        )}
      </section>

      {/*  input */}
      <section>
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your travel plans..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />
          <Button
            size={"icon"}
            className="absolute bottom-3 right-5"
            onClick={() => onSend()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Chatbox;
