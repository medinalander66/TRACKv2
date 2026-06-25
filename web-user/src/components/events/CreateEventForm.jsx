import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import SelectDropdown from "../common/SelectDropdown";
import RadioGroup from "../common/RadioGroup";
import FileAttachment from "../common/FileAttachment";
import styles from "../../styles/components/events/CreateEventForm.module.css";
import EventColor from "../events/EventColor";

export default function CreateEventForm() {
  const [event, setEvent] = useState({
    title: "",
    color: "",
    visibility: "campus",
    method: "face-to-face",
    link: "",
    hierarchy: "",
    eventType: "",
    venue: "",
    venueType: "",
    description: "",
    startDate: "2023-10-24",
    endDate: "2023-10-24",
    reminder: "5",
    emailReminder: "yes",
    attendees: [],
    staff: [],
    collaborator: "",
    attachments: [],
  });

  const updateField = (field, value) =>
    setEvent((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted event:", event);
    // TODO: call API
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <InputField
          className={styles.titleInput}
          value={event.title}
          placeholder="Enter title for your event.."
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.col}>
              <EventColor
                value={event.color}
                onChange={(colorValue) => updateField("color", colorValue)}
              />
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>VISIBILITY OF EVENT</div>
            <RadioGroup
              name="visibility"
              options={[
                { value: "campus", label: "Campus" },
                { value: "department", label: "Department" },
                { value: "personal", label: "Personal" },
              ]}
              value={event.visibility}
              onChange={(e) => updateField("visibility", e.target.value)}
            />
          </div>

          <div className={styles.col}>
            <div className={styles.label}>METHOD</div>
            <RadioGroup
              name="method"
              options={[
                { value: "face-to-face", label: "Face to Face" },
                { value: "online", label: "Online" },
              ]}
              value={event.method}
              onChange={(e) => updateField("method", e.target.value)}
            />
          </div>
          {event.method === "online" && (
            <div className={styles.col}>
              <InputField
                label="EVENT LINK"
                value={event.link}
                onChange={(e) => updateField("link", e.target.value)}
              />
            </div>
          )}

          <div className={styles.row}>
            <SelectDropdown
              label="HIERARCHY LEVEL"
              options={[
                { value: "local", label: "Local" },
                { value: "regional", label: "Regional" },
                { value: "national", label: "National" },
                { value: "international", label: "International" },
              ]}
              value={event.hierarchy}
              onChange={(e) => updateField("hierarchy", e.target.value)}
            />
            <SelectDropdown
              label="Type"
              options={[
                { value: "meeting", label: "Meeting" },
                { value: "seminar", label: "Seminar" },
                { value: "workshop", label: "Workshop" },
              ]}
              value={event.eventType}
              onChange={(e) => updateField("eventType", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <SelectDropdown
              label="VENUE"
              options={[{ value: "auditorium", label: "Auditorium" }]} // fetch from API
              value={event.venue}
              onChange={(e) => updateField("venue", e.target.value)}
            />
            <SelectDropdown
              label="Select Venue Type"
              options={[
                { value: "hall", label: "Hall" },
                { value: "room", label: "Room" },
              ]}
              value={event.venueType}
              onChange={(e) => updateField("venueType", e.target.value)}
            />
          </div>

          <InputField
            label="DESCRIPTION"
            as="textarea"
            rows={3}
            value={event.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Add details about your event, agenda, or guest list..."
          />
        </div>

        <div className={styles.section}>
          <h3>SCHEDULE</h3>
          <div className={styles.row}>
            <InputField
              label="STARTS DATE"
              type="date"
              value={event.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
            />
            <InputField
              label="ENDS DATE"
              type="date"
              value={event.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.label}>REMINDER</div>
              <RadioGroup
                name="reminder"
                options={[
                  { value: "5", label: "5 min before" },
                  { value: "10", label: "10 min before" },
                  { value: "15", label: "15 min before" },
                ]}
                value={event.reminder}
                onChange={(e) => updateField("reminder", e.target.value)}
              />
            </div>
            <div className={styles.col}>
              <div className={styles.label}>EMAIL REMINDER</div>
              <RadioGroup
                name="emailReminder"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={event.emailReminder}
                onChange={(e) => updateField("emailReminder", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <SelectDropdown
            label="INVITE ATTENDEES"
            options={[{ value: "john", label: "John Doe" }]} // fetch from API
            value={event.attendees}
            onChange={(e) => updateField("attendees", [e.target.value])}
          />

          <SelectDropdown
            label="ASSIGN STAFF (OPTIONAL)"
            options={[{ value: "staff1", label: "Staff Name" }]}
            value={event.staff}
            onChange={(e) => updateField("staff", [e.target.value])}
          />

          <InputField
            label="ADD COLLABORATOR"
            value={event.collaborator}
            onChange={(e) => updateField("collaborator", e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <FileAttachment
            files={event.attachments}
            onRemove={(file) =>
              updateField(
                "attachments",
                event.attachments.filter((f) => f !== file),
              )
            }
            onAdd={() => alert("Open file picker")}
          />
        </div>
      </div>
    </form>
  );
}
