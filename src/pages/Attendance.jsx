import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { toast } from "sonner";
import defaultAttendance from "../data/attendance.json";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const ATTENDANCE_KEY = "attendance";
const STUDENTS_KEY = "students";

const emptyRecord = {
  studentId: "",
  date: "",
  status: "",
  remarks: "",
};

function loadAttendance() {
  const stored = localStorage.getItem(ATTENDANCE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(defaultAttendance));
  return defaultAttendance;
}

function saveAttendance(data) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data));
}

function loadStudents() {
  const stored = localStorage.getItem(STUDENTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: emptyRecord });

  useEffect(() => {
    setRecords(loadAttendance());
    setStudents(loadStudents());
  }, []);

  // --- helpers ---
  const getStudentName = (studentId) => {
    const s = students.find((st) => st.studentId === studentId);
    if (!s) return studentId;
    return `${s.firstName} ${s.middleName ? s.middleName + " " : ""}${s.lastName}`;
  };

  // --- Modal handlers ---
  const openCreate = () => {
    reset({ ...emptyRecord });
    setModalMode("create");
    setModalVisible(true);
  };

  const openView = (record) => {
    setSelectedRecord(record);
    reset({ ...record });
    setModalMode("view");
    setModalVisible(true);
  };

  const openEdit = (record) => {
    setSelectedRecord(record);
    reset({ ...record });
    setModalMode("edit");
    setModalVisible(true);
  };

  const openDelete = (record) => {
    setSelectedRecord(record);
    setDeleteVisible(true);
  };

  const onSubmit = (data) => {
    let updated;
    if (modalMode === "create") {
      const newId =
        records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;
      updated = [...records, { ...data, id: newId }];
      toast.success("Attendance recorded successfully!");
    } else {
      updated = records.map((r) =>
        r.id === selectedRecord.id ? { ...data, id: r.id } : r
      );
      toast.success("Attendance updated successfully!");
    }

    setRecords(updated);
    saveAttendance(updated);
    setModalVisible(false);
  };

  const handleDelete = () => {
    const updated = records.filter((r) => r.id !== selectedRecord.id);
    setRecords(updated);
    saveAttendance(updated);
    setDeleteVisible(false);
    toast.success("Attendance record deleted successfully!");
  };

  // --- Column templates ---
  const studentNameBody = (row) => (
    <span className="font-medium">{getStudentName(row.studentId)}</span>
  );

  const statusBody = (row) => {
    const colors = {
      Present: "bg-emerald-500/20 text-emerald-400",
      Absent: "bg-red-500/20 text-red-400",
      Late: "bg-amber-500/20 text-amber-400",
      Excused: "bg-blue-500/20 text-blue-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[row.status] || "bg-slate-500/20 text-slate-400"}`}
      >
        {row.status}
      </span>
    );
  };

  const actionBody = (row) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => openView(row)}
        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
        title="View"
      >
        <i className="pi pi-eye text-sm" />
      </button>
      <button
        onClick={() => openEdit(row)}
        className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/20 transition-colors"
        title="Edit"
      >
        <i className="pi pi-pencil text-sm" />
      </button>
      <button
        onClick={() => openDelete(row)}
        className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
        title="Delete"
      >
        <i className="pi pi-trash text-sm" />
      </button>
    </div>
  );

  const modalTitle =
    modalMode === "create"
      ? "Record Attendance"
      : modalMode === "edit"
      ? "Edit Attendance"
      : "Attendance Details";

  const isReadOnly = modalMode === "view";

  return (
    <div className="space-y-6 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-violet-400">
            Attendance Records
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and track student attendance
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="flex items-center gap-2 w-auto px-5 py-2.5 text-sm"
        >
          <i className="pi pi-plus text-sm" />
          Record Attendance
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="pi pi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search attendance records..."
          className="w-full md:w-80 border border-slate-600 bg-slate-800/50 text-slate-100 placeholder-slate-400 py-2.5 pl-10 pr-4 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* DataTable */}
      <div className="student-table bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <DataTable
          value={records}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          emptyMessage="No attendance records found."
        >
          <Column field="studentId" header="Student ID" sortable />
          <Column header="Student Name" body={studentNameBody} sortable sortField="studentId" />
          <Column field="date" header="Date" sortable />
          <Column header="Status" body={statusBody} sortable sortField="status" />
          <Column field="remarks" header="Remarks" />
          <Column
            header="Actions"
            body={actionBody}
            style={{ width: "10rem" }}
          />
        </DataTable>
      </div>

      {/* Create / View / Edit Modal */}
      <Dialog
        header={modalTitle}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        modal
        className="student-dialog w-[95vw] max-w-2xl"
        draggable={false}
        footer={
          !isReadOnly && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModalVisible(false)}
                className="px-5 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors font-montserrat text-sm cursor-pointer"
              >
                Cancel
              </button>
              <Button
                onClick={handleSubmit(onSubmit)}
                className="w-auto px-5 py-2 text-sm"
              >
                {modalMode === "create" ? "Record" : "Save Changes"}
              </Button>
            </div>
          )
        }
      >
        <form id="attendanceForm" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div>
            <Label htmlFor="studentId">Student</Label>
            <select
              id="studentId"
              {...register("studentId", { required: "Student is required" })}
              disabled={isReadOnly}
              className={`w-full border bg-slate-800 text-slate-100 p-3 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-60 ${errors.studentId ? "!border-red-500 focus:!ring-red-500/30" : "border-slate-600 focus:ring-violet-500"}`}
            >
              <option value="" className="bg-slate-800 text-slate-400">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.studentId} className="bg-slate-800 text-slate-100">
                  {s.studentId} - {s.firstName} {s.lastName}
                </option>
              ))}
            </select>
            {errors.studentId && <p className="text-red-400 text-xs mt-1">{errors.studentId.message}</p>}
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
              readOnly={isReadOnly}
              className={errors.date ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              {...register("status", { required: "Status is required" })}
              disabled={isReadOnly}
              className={`w-full border bg-slate-800 text-slate-100 p-3 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-60 ${errors.status ? "!border-red-500 focus:!ring-red-500/30" : "border-slate-600 focus:ring-violet-500"}`}
            >
              <option value="" className="bg-slate-800 text-slate-400">Select Status</option>
              <option value="Present" className="bg-slate-800 text-slate-100">Present</option>
              <option value="Absent" className="bg-slate-800 text-slate-100">Absent</option>
              <option value="Late" className="bg-slate-800 text-slate-100">Late</option>
              <option value="Excused" className="bg-slate-800 text-slate-100">Excused</option>
            </select>
            {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status.message}</p>}
          </div>
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              {...register("remarks")}
              placeholder="Optional remarks"
              readOnly={isReadOnly}
            />
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        header="Confirm Delete"
        visible={deleteVisible}
        onHide={() => setDeleteVisible(false)}
        modal
        className="student-dialog w-[95vw] max-w-md"
        draggable={false}
        footer={
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteVisible(false)}
              className="px-5 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors font-montserrat text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all font-montserrat text-sm cursor-pointer"
            >
              Delete
            </button>
          </div>
        }
      >
        <div className="pt-4 text-slate-300 font-poppins">
          <p>Are you sure you want to delete this attendance record?</p>
          {selectedRecord && (
            <p className="mt-2 font-semibold text-white">
              {getStudentName(selectedRecord.studentId)} — {selectedRecord.date} ({selectedRecord.status})
            </p>
          )}
          <p className="mt-2 text-sm text-red-400">
            This action cannot be undone.
          </p>
        </div>
      </Dialog>
    </div>
  );
}
