package com.sap.medicine.scalble.Medicine.service;

import com.sap.medicine.scalble.Medicine.Repository.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {

}
