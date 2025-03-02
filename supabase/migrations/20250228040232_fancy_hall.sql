/*
  # Create skill progress table

  1. New Tables
    - `skill_progress`
      - `id` (uuid, primary key)
      - `skill_id` (uuid, foreign key to skills)
      - `date` (timestamp)
      - `progress_value` (integer)
      - `notes` (text)
  2. Security
    - Enable RLS on `skill_progress` table
    - Add policy for authenticated users to CRUD their own skill progress
*/

CREATE TABLE IF NOT EXISTS skill_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  date timestamptz DEFAULT now(),
  progress_value integer NOT NULL CHECK (progress_value >= 0 AND progress_value <= 100),
  notes text
);

ALTER TABLE skill_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own skill progress"
  ON skill_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM skills
      WHERE skills.id = skill_progress.skill_id
      AND skills.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own skill progress"
  ON skill_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM skills
      WHERE skills.id = skill_progress.skill_id
      AND skills.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own skill progress"
  ON skill_progress
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM skills
      WHERE skills.id = skill_progress.skill_id
      AND skills.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own skill progress"
  ON skill_progress
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM skills
      WHERE skills.id = skill_progress.skill_id
      AND skills.user_id = auth.uid()
    )
  );