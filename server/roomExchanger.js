const path = require("path");
const { format } = require("util");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js");
const fs = require("fs");
var express = require('express');
const { log } = require("console");
var app = express();
dotenv.config();

async function get_my_requests(req, res) {
    const {id} = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM room_change_request where email_id = $1", [id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting your requests.");
    }
}

async function request_for_exchange(req, res) {
    var info = req.body ;
    console.log(info);
    try{
        await pool.query("INSERT INTO room_change_request(email_id, prev_room, req_room,reason,comments,isexchange,phone,exchange_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
            [
                info.email_id,
                info.prev_room,
                info.req_room,
                info.reason,
                info.comments,
                info.isexchange,
                info.phone,
                info.exchange_id,
            ]
        );
        res.status(200).send("Request successfully registered.");

    }catch(err){
        console.error(err);
        res.status(500).send("Error registering for room change.");    
    }
   
}

async function get_my_complaints(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const { rows } = await pool.query("SELECT * FROM complaint_details WHERE email_id=$1",[id]);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting the complaint.");
    }
}

async function get_all_solved_complaints(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM complaint_details WHERE complaint_status='done'");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting all complaints.");
    }
}

async function solveIt(req, res) {
    const { id } = req.params;
  
    try {
      const { rowCount } = await pool.query("UPDATE complaint_details SET complaint_status='done' WHERE complaint_id=$1", [id]);
  
      if (rowCount === 1) {
        res.status(200).send(`Complaint with id ${id} has been marked as solved`);
      } else {
        res.status(404).send(`Complaint with id ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating complaint status.");
    }
  }
  


async function save_data(req, res) {
    var info = req.body;

    console.log(info);
    try {
        await pool.query("INSERT INTO complaint_details(name, email_id, hostel_name,wing_side,room_number,floor_number,complaint_type,complaint_details) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
            [
                info.username,
                info.emailid,
                info.hostel,
                info.wing,
                info.room,
                info.floor,
                info.complainttype,
                info.complaint,
            ]
        );

        res.status(200).send("Complaint successfully registered.");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering complaint.");
    }
}



module.exports = {
    get_my_requests,
    request_for_exchange
};
