"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

import { getMessages, downloadMessages } from "@/app/api/messages.api";
import MessageTable from "../components/MessageTable";
import { Message } from "../types/message";

/* shadcn */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  /* pagination + filters */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchMessages = async () => {
    setLoading(true);

    try {
      const res = await getMessages({
        page,
        limit: 10,
        search,
        from,
        to,
      });

      setMessages(res.data);
      setTotalPages(res.pagination.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setFrom("");
    setTo("");
    setPage(1);
  };

  useEffect(() => {
    fetchMessages();
  }, [page, search, from, to]);

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-slate-50 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Messages
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enquiries from website visitors
              </p>
            </CardHeader>
          </Card>

          {/* FILTER BAR */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between">

            {/* LEFT FILTERS */}
            <div className="flex flex-wrap gap-3 items-end w-full lg:w-auto">
              <Input
                placeholder="Search messages or email or phone…"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full sm:w-64"
              />

              <Input
                type="date"
                value={from}
                onChange={(e) => {
                  setPage(1);
                  setFrom(e.target.value);
                }}
                className="w-full sm:w-auto"
              />

              <Input
                type="date"
                value={to}
                onChange={(e) => {
                  setPage(1);
                  setTo(e.target.value);
                }}
                className="w-full sm:w-auto"
              />

              {/* ✅ RESET BUTTON */}
              <Button
                className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
                onClick={resetFilters}
                disabled={!search && !from && !to}
              >
                Reset
              </Button>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="w-full lg:w-auto p-4 bg-white shadow rounded-lg">
              <p className="text-sm md:text-base font-medium mb-3 text-gray-700">
                Download messages:
              </p>

              <div className="flex flex-wrap gap-2">
                {["today", "week", "month", "year"].map((range) => (
                  <Button
                    key={range}
                    variant="outline"
                    className="flex-1 sm:flex-none px-4 py-2 text-sm md:text-base"
                    onClick={() => downloadMessages(range)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* TABLE */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading messages…
            </div>
          ) : (
            <MessageTable messages={messages} refresh={fetchMessages} />
          )}

          {/* PAGINATION */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}