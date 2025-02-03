import os
import zipfile
from pathlib import Path

def zip_directory():
    try:
        # Get the absolute path of the tnadvancemanage directory
        source_dir = Path(__file__).parent / 'moodle_data/local/tnadvancemanage'
        output_zip = Path(__file__).parent / 'tnadvancemanage.zip'

        # Check if source directory exists
        if not source_dir.exists():
            print(f"Error: Source directory {source_dir} does not exist")
            return False

        # Create a ZipFile object
        with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Walk through the directory
            for root, dirs, files in os.walk(source_dir):
                for file in files:
                    # Get the full path of the file
                    file_path = os.path.join(root, file)
                    # Calculate path relative to source_dir's parent
                    rel_path = os.path.join('tnadvancemanage', os.path.relpath(file_path, source_dir))
                    # Add file to zip with the plugin name as root directory
                    zipf.write(file_path, rel_path)

        print(f"Successfully created zip file at: {output_zip}")
        return True

    except Exception as e:
        print(f"Error creating zip file: {str(e)}")
        return False

if __name__ == '__main__':
    zip_directory()