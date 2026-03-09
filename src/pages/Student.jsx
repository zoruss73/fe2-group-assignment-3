import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { toast } from "sonner";
import defaultStudents from "../data/students.json";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const STORAGE_KEY = "students";

const emptyStudent = {
  studentId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  course: "",
  yearLevel: "",
  gender: "",
  contactNumber: "",
  address: "",
};

function loadStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudents));
  return defaultStudents;
}

function saveStudents(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Student() {
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create | view | edit
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: emptyStudent });

  useEffect(() => {
    setStudents(loadStudents());
  }, []);

  // --- Modal handlers ---
  const openCreate = () => {
    reset({ ...emptyStudent });
    setModalMode("create");
    setModalVisible(true);
  };

  const openView = (student) => {
    setSelectedStudent(student);
    reset({ ...student });
    setModalMode("view");
    setModalVisible(true);
  };

  const openEdit = (student) => {
    setSelectedStudent(student);
    reset({ ...student });
    setModalMode("edit");
    setModalVisible(true);
  };

  const openDelete = (student) => {
    setSelectedStudent(student);
    setDeleteVisible(true);
  };

  const onSubmit = (data) => {
    let updated;
    if (modalMode === "create") {
      const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      const lastStudentId =
        students.length > 0
          ? Math.max(...students.map((s) => parseInt(s.studentId, 10) || 0))
          : 260000;
      const newStudentId = String(lastStudentId + 1);
      updated = [...students, { ...data, studentId: newStudentId, id: newId }];
      toast.success("Student created successfully!");
    } else {
      updated = students.map((s) =>
        s.id === selectedStudent.id ? { ...data, id: s.id } : s
      );
      toast.success("Student updated successfully!");
    }

    setStudents(updated);
    saveStudents(updated);
    setModalVisible(false);
  };

  const handleDelete = () => {
    const updated = students.filter((s) => s.id !== selectedStudent.id);
    setStudents(updated);
    saveStudents(updated);
    setDeleteVisible(false);
    toast.success("Student deleted successfully!");
  };

  // --- Column templates ---
  const nameBody = (row) => (
    <span className="font-medium">
      {row.firstName} {row.middleName ? `${row.middleName} ` : ""}{row.lastName}
    </span>
  );

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
      ? "Create Student"
      : modalMode === "edit"
      ? "Edit Student"
      : "Student Details";

  const isReadOnly = modalMode === "view";

  return (
    <div className="space-y-6 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-violet-400">
            Student Profiles
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and view all student records
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="flex items-center gap-2 w-auto px-5 py-2.5 text-sm"
        >
          <i className="pi pi-plus text-sm" />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="pi pi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search students..."
          className="w-full md:w-80 border border-slate-600 bg-slate-800/50 text-slate-100 placeholder-slate-400 py-2.5 pl-10 pr-4 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* DataTable */}
      <div className="student-table bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <DataTable
          value={students}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          emptyMessage="No students found."
        >
          <Column field="studentId" header="Student ID" sortable />
          <Column header="Name" body={nameBody} sortable sortField="lastName" />
          <Column field="email" header="Email" sortable />
          <Column field="course" header="Course" sortable />
          <Column field="yearLevel" header="Year Level" sortable />
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
                {modalMode === "create" ? "Create" : "Save Changes"}
              </Button>
            </div>
          )
        }
      >
        <form id="studentForm" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {modalMode !== "create" && (
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                {...register("studentId")}
                readOnly
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="student@university.edu"
              readOnly={isReadOnly}
              className={errors.email ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              placeholder="First name"
              readOnly={isReadOnly}
              className={errors.firstName ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              {...register("middleName")}
              placeholder="Middle name"
              readOnly={isReadOnly}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last name"
              readOnly={isReadOnly}
              className={errors.lastName ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              {...register("course", { required: "Course is required" })}
              placeholder="e.g. BS Computer Science"
              readOnly={isReadOnly}
              className={errors.course ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course.message}</p>}
          </div>
          <div>
            <Label htmlFor="yearLevel">Year Level</Label>
            <select
              id="yearLevel"
              {...register("yearLevel", { required: "Year level is required" })}
              disabled={isReadOnly}
              className={`w-full border bg-slate-800 text-slate-100 p-3 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-60 ${errors.yearLevel ? "!border-red-500 focus:!ring-red-500/30" : "border-slate-600 focus:ring-violet-500"}`}
            >
              <option value="" className="bg-slate-800 text-slate-400">Select Year Level</option>
              <option value="1st Year" className="bg-slate-800 text-slate-100">1st Year</option>
              <option value="2nd Year" className="bg-slate-800 text-slate-100">2nd Year</option>
              <option value="3rd Year" className="bg-slate-800 text-slate-100">3rd Year</option>
              <option value="4th Year" className="bg-slate-800 text-slate-100">4th Year</option>
            </select>
            {errors.yearLevel && <p className="text-red-400 text-xs mt-1">{errors.yearLevel.message}</p>}
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              disabled={isReadOnly}
              className={`w-full border bg-slate-800 text-slate-100 p-3 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-60 ${errors.gender ? "!border-red-500 focus:!ring-red-500/30" : "border-slate-600 focus:ring-violet-500"}`}
            >
              <option value="" className="bg-slate-800 text-slate-400">Select Gender</option>
              <option value="Male" className="bg-slate-800 text-slate-100">Male</option>
              <option value="Female" className="bg-slate-800 text-slate-100">Female</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              {...register("contactNumber", { required: "Contact number is required" })}
              placeholder="09XXXXXXXXX"
              readOnly={isReadOnly}
              className={errors.contactNumber ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber.message}</p>}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              placeholder="Full address"
              readOnly={isReadOnly}
              className={errors.address ? "!border-red-500 focus:!ring-red-500/30" : ""}
            />
            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
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
          <p>Are you sure you want to delete this student?</p>
          {selectedStudent && (
            <p className="mt-2 font-semibold text-white">
              {selectedStudent.firstName} {selectedStudent.lastName} (
              {selectedStudent.studentId})
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
