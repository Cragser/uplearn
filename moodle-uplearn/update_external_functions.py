#!/usr/bin/env python3

import os
import sys
import mysql.connector
from configparser import ConfigParser

def get_db_config():
    config_file = os.path.join(os.path.dirname(__file__), 'moodle_data', 'config.php')
    if not os.path.exists(config_file):
        print(f"Error: Moodle config file not found at {config_file}")
        sys.exit(1)
    
    # Read config.php and extract database settings
    with open(config_file, 'r') as f:
        content = f.read()
    
    # Extract database configuration using simple parsing
    # Note: This is a basic implementation and might need adjustment based on your config.php format
    config = {}
    for line in content.split('\n'):
        if '$CFG->dbhost' in line:
            config['host'] = line.split("'")[1]
        elif '$CFG->dbname' in line:
            config['database'] = line.split("'")[1]
        elif '$CFG->dbuser' in line:
            config['user'] = line.split("'")[1]
        elif '$CFG->dbpass' in line:
            config['password'] = line.split("'")[1]
    
    return config

def update_external_functions():
    # Get database configuration
    db_config = get_db_config()
    
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Functions to update/insert
        functions = [
            {
                'name': 'local_tnadvancemanage_create_page',
                'classname': 'local_tnadvancemanage\\external\\page_api',
                'methodname': 'create_page',
                'component': 'local_tnadvancemanage',
                'capabilities': 'moodle/course:manageactivities'
            },
            {
                'name': 'local_tnadvancemanage_create_glossary',
                'classname': 'local_tnadvancemanage\\external\\glossary_api',
                'methodname': 'create_glossary',
                'component': 'local_tnadvancemanage',
                'capabilities': 'moodle/course:manageactivities'
            }
        ]
        
        for func in functions:
            # Check if function already exists
            cursor.execute(
                "SELECT * FROM mdl_external_functions WHERE name = %s",
                (func['name'],)
            )
            existing = cursor.fetchone()
            
            if existing:
                # Update existing function
                cursor.execute(
                    """UPDATE mdl_external_functions 
                       SET classname = %s, methodname = %s, component = %s, capabilities = %s
                       WHERE name = %s""",
                    (func['classname'], func['methodname'], func['component'],
                     func['capabilities'], func['name'])
                )
                print(f"Updated function: {func['name']}")
            else:
                # Insert new function
                cursor.execute(
                    """INSERT INTO mdl_external_functions 
                       (name, classname, methodname, component, capabilities)
                       VALUES (%s, %s, %s, %s, %s)""",
                    (func['name'], func['classname'], func['methodname'],
                     func['component'], func['capabilities'])
                )
                print(f"Inserted function: {func['name']}")
        
        # Commit the changes
        conn.commit()
        print("Successfully updated external functions")
        
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        sys.exit(1)
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    update_external_functions()